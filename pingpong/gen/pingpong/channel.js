// Code generated by eddwise, DO NOT EDIT.

/**
 * @typedef ping
 * @property {uint} id - the id of the ping 
 * @description ping is emitted from server
*/

/**
 * @typedef pong
 * @property {uint} id - the id of the pong, same as the id of the received ping 
 * @description after a ping, a pong is sent from client
*/


class pingpongChannel {
	constructor() {
		Object.defineProperty(this, "getName", { configurable: false, writable: false, value: this.getName });
		Object.defineProperty(this, "setConn", { configurable: false, writable: false, value: this.setConn });
		Object.defineProperty(this, "route", { configurable: false, writable: false, value: this.route });

		Object.defineProperty(this, "pong", { configurable: false, writable: false, value: this.sendpong });

		this._onpingFn = null;
		this._connectedFn = null;
		this._disconnectedFn = null;
	}
	/**
     * @callback connectedCb
     */
    /**
     * @function pingpongChannel#connected
     * @param {connectedCb} callback
     */
	connected(callback){
		this._connectedFn = callback;
	}

	/**
     * @callback disconnectedCb
     */
    /**
     * @function pingpongChannel#disconnected
     * @param {disconnectedCb} callback
     */
	disconnected(callback){
		this._disconnectedFn = callback;
	}
	getName() {
		return "pingpong"
	}
	setConn(conn) {
		this.conn = conn
	}
	route(name, body) {
		switch(name) {
			default:
				console.log("unexpected event ", name, "in channel pingpong")
				break

			case "ping":
				return this.onpingFn(body)

        }
    }


	/**
	 * @function pingpongChannel#onpingFn
	 * @param {ping} event
	*/
    onpingFn(event) {
        if(this._onpingFn == null) {
            console.log("unhandled message 'ChangeName' received")
            return
        }
        this._onpingFn(event)
    }
    /**
     * @callback onpingCb
     * @param {ping} event
     */
    /**
     * @function pingpongChannel#onping
     * @param {onpingCb} callback
     */
     onping(callback) {
        this._onpingFn = callback
    }


    /**
     * @function pingpongChannel#sendpong
     * @param {pong} message
     */
    sendpong = function(message) {
        this.conn.send( JSON.stringify({channel:this.getName(), name:"pong", body: message}) );
    }

}

