/* ===== 简化版 OrbitControls (UMD) =====
 * 仅支持鼠标/触摸 旋转、缩放、平移，依赖 window.THREE
 * 从 three.js examples 抽取，精简自 https://github.com/mrdoob/three.js
 */
(function () {
    if (typeof THREE === "undefined") {
        console.error("[OrbitControls] 需要先加载 three.js");
        return;
    }
    function OrbitControls(object, domElement) {
        this.object = object;
        this.domElement = domElement || document;
        this.enabled = true;
        this.enableDamping = true;
        this.dampingFactor = 0.08;
        this.rotateSpeed = 0.8;
        this.zoomSpeed = 1.0;
        this.panSpeed = 0.5;
        this.minDistance = 2;
        this.maxDistance = 1200;
        this.target = new THREE.Vector3();

        this._spherical = new THREE.Spherical();
        this._sphericalDelta = new THREE.Spherical();
        this._scale = 1;
        this._panOffset = new THREE.Vector3();
        this._rotateStart = new THREE.Vector2();
        this._rotateEnd = new THREE.Vector2();
        this._rotateDelta = new THREE.Vector2();
        this._zoomStart = new THREE.Vector2();
        this._zoomEnd = new THREE.Vector2();
        this._panStart = new THREE.Vector2();
        this._panEnd = new THREE.Vector2();
        this._panDelta = new THREE.Vector2();
        this._isDragging = false;
        this._isPanning = false;
        this._isZooming = false;
        var self = this;

        this._getSphericalFromCamera = function () {
            var offset = new THREE.Vector3().subVectors(this.object.position, this.target);
            this._spherical.setFromVector3(offset);
        };
        this._getSphericalFromCamera();

        function onPointerDown(e) {
            if (!self.enabled) return;
            e.preventDefault();
            if (e.button === 0) self._isDragging = true;
            if (e.button === 2) self._isPanning = true;
            self._rotateStart.set(e.clientX, e.clientY);
            self._panStart.set(e.clientX, e.clientY);
            document.addEventListener("pointermove", onPointerMove);
            document.addEventListener("pointerup", onPointerUp);
        }
        function onPointerMove(e) {
            if (!self.enabled) return;
            e.preventDefault();
            if (self._isDragging) {
                self._rotateEnd.set(e.clientX, e.clientY);
                self._rotateDelta.subVectors(self._rotateEnd, self._rotateStart).multiplyScalar(self.rotateSpeed);
                var el = self.domElement === document ? self.domElement.body : self.domElement;
                self._sphericalDelta.theta -= 2 * Math.PI * self._rotateDelta.x / el.clientHeight;
                self._sphericalDelta.phi -= 2 * Math.PI * self._rotateDelta.y / el.clientHeight;
                self._rotateStart.copy(self._rotateEnd);
            } else if (self._isPanning) {
                self._panEnd.set(e.clientX, e.clientY);
                self._panDelta.subVectors(self._panEnd, self._panStart).multiplyScalar(self.panSpeed);
                panLeft(self._panDelta.x);
                panUp(self._panDelta.y);
                self._panStart.copy(self._panEnd);
            }
        }
        function onPointerUp() {
            self._isDragging = false;
            self._isPanning = false;
            document.removeEventListener("pointermove", onPointerMove);
            document.removeEventListener("pointerup", onPointerUp);
        }
        function onWheel(e) {
            if (!self.enabled) return;
            e.preventDefault();
            if (e.deltaY < 0) self._scale /= Math.pow(0.95, self.zoomSpeed);
            else self._scale *= Math.pow(0.95, self.zoomSpeed);
            self._scale = Math.max(0.1, Math.min(10, self._scale));
        }
        function panLeft(deltaX) {
            var te = self.object.matrix.elements;
            self._panOffset.x += te[0] * (-deltaX);
            self._panOffset.y += te[4] * (-deltaX);
            self._panOffset.z += te[8] * (-deltaX);
        }
        function panUp(deltaY) {
            var te = self.object.matrix.elements;
            self._panOffset.x += te[1] * deltaY;
            self._panOffset.y += te[5] * deltaY;
            self._panOffset.z += te[9] * deltaY;
        }

        this.domElement.addEventListener("pointerdown", onPointerDown);
        this.domElement.addEventListener("wheel", onWheel, { passive: false });
        this.domElement.addEventListener("contextmenu", function (e) { e.preventDefault(); });

        this.update = function () {
            var offset = new THREE.Vector3();
            var quat = new THREE.Quaternion().setFromUnitVectors(this.object.up, new THREE.Vector3(0, 1, 0));
            var quatInverse = quat.clone().invert();

            offset.copy(this.object.position).sub(this.target);
            offset.applyQuaternion(quat);
            this._spherical.setFromVector3(offset);

            this._spherical.theta += this._sphericalDelta.theta;
            this._spherical.phi += this._sphericalDelta.phi;
            this._spherical.phi = Math.max(0.05, Math.min(Math.PI - 0.05, this._spherical.phi));
            this._spherical.radius *= this._scale;
            this._spherical.radius = Math.max(this.minDistance, Math.min(this.maxDistance, this._spherical.radius));

            this.target.add(this._panOffset);
            offset.setFromSpherical(this._spherical);
            offset.applyQuaternion(quatInverse);
            this.object.position.copy(this.target).add(offset);
            this.object.lookAt(this.target);

            if (this.enableDamping) {
                this._sphericalDelta.theta *= 1 - this.dampingFactor;
                this._sphericalDelta.phi *= 1 - this.dampingFactor;
                this._panOffset.multiplyScalar(1 - this.dampingFactor);
            } else {
                this._sphericalDelta.set(0, 0, 0);
                this._panOffset.set(0, 0, 0);
            }
            this._scale = 1;
        };

        this.dispose = function () {
            this.domElement.removeEventListener("pointerdown", onPointerDown);
            this.domElement.removeEventListener("wheel", onWheel);
            document.removeEventListener("pointermove", onPointerMove);
            document.removeEventListener("pointerup", onPointerUp);
        };
    }

    // 挂载到 THREE 和 window
    THREE.OrbitControls = OrbitControls;
    window.OrbitControls = OrbitControls;
})();
