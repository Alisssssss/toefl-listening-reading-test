class CountdownTimer {
    constructor(totalSeconds, callbacks = {}) {
        this.totalSeconds = totalSeconds;
        this.remainingSeconds = totalSeconds;
        this.intervalId = null;
        this.onTick = callbacks.onTick || null;
        this.onExpire = callbacks.onExpire || null;
    }

    start() {
        if (this.intervalId) return;
        this._emitTick();
        this.intervalId = setInterval(() => {
            this.remainingSeconds -= 1;
            if (this.remainingSeconds <= 0) {
                this.remainingSeconds = 0;
                this._emitTick();
                this.stop();
                if (typeof this.onExpire === 'function') {
                    this.onExpire();
                }
                return;
            }
            this._emitTick();
        }, 1000);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    reset(newTotalSeconds = this.totalSeconds) {
        this.stop();
        this.totalSeconds = newTotalSeconds;
        this.remainingSeconds = newTotalSeconds;
        this._emitTick();
    }

    _emitTick() {
        if (typeof this.onTick === 'function') {
            this.onTick(this.remainingSeconds);
        }
    }
}
