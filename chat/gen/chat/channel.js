// Code generated by eddwise, DO NOT EDIT.

/**
 * @typedef ChangeName
 * @property {uint} [UserId] - the optional UserId is set only by server while broadcasting // ServerToClient
 * @property {string} Name 
 * @description ChangeName is sent from client to server and then broadcast by server to all clients
*/

/**
 * @typedef Message
 * @property {uint} [UserId] - UserId is the optional id of the user. Set only by server, not by client // ServerToClient
 * @property {string} Text 
 * @description Message is sent from client to server and broadcast to other clients
*/

/**
 * @typedef UserEnter
 * @property {uint} UserId 
 * @property {string} Name 
 * @description UserEnter is broadcast by server to all clients when a new client connects
*/

/**
 * @typedef UserLeft
 * @property {uint} UserId 
 * @description UserLeft is broadcast by server to all clients when a client lefts
*/

/**
 * @typedef UserListUpdate
 * @property {object} List 
 * @description UserListUpdate is sent to a new connected client
*/


class ChatChannel {
	constructor() {
		Object.defineProperty(this, "getName", { configurable: false, writable: false, value: this.getName });
		Object.defineProperty(this, "setConn", { configurable: false, writable: false, value: this.setConn });
		Object.defineProperty(this, "route", { configurable: false, writable: false, value: this.route });

		Object.defineProperty(this, "ChangeName", { configurable: false, writable: false, value: this.sendChangeName });
		Object.defineProperty(this, "Message", { configurable: false, writable: false, value: this.sendMessage });

		this._onChangeNameFn = null;
		this._onMessageFn = null;
		this._onUserEnterFn = null;
		this._onUserLeftFn = null;
		this._onUserListUpdateFn = null;
		this._connectedFn = null;
		this._disconnectedFn = null;
	}
	/**
     * @callback connectedCb
     */
    /**
     * @function ChatChannel#connected
     * @param {connectedCb} callback
     */
	connected(callback){
		this._connectedFn = callback;
	}

	/**
     * @callback disconnectedCb
     */
    /**
     * @function ChatChannel#disconnected
     * @param {disconnectedCb} callback
     */
	disconnected(callback){
		this._disconnectedFn = callback;
	}
	getName() {
		return "Chat"
	}
	setConn(conn) {
		this.conn = conn
	}
	route(name, body) {
		switch(name) {
			default:
				console.log("unexpected event ", name, "in channel Chat")
				break

			case "ChangeName":
				return this.onChangeNameFn(body)

			case "Message":
				return this.onMessageFn(body)

			case "UserEnter":
				return this.onUserEnterFn(body)

			case "UserLeft":
				return this.onUserLeftFn(body)

			case "UserListUpdate":
				return this.onUserListUpdateFn(body)

        }
    }


	/**
	 * @function ChatChannel#onChangeNameFn
	 * @param {ChangeName} event
	*/
    onChangeNameFn(event) {
        if(this._onChangeNameFn == null) {
            console.log("unhandled message 'ChangeName' received")
            return
        }
        this._onChangeNameFn(event)
    }
    /**
     * @callback onChangeNameCb
     * @param {ChangeName} event
     */
    /**
     * @function ChatChannel#onChangeName
     * @param {onChangeNameCb} callback
     */
     onChangeName(callback) {
        this._onChangeNameFn = callback
    }

	/**
	 * @function ChatChannel#onMessageFn
	 * @param {Message} event
	*/
    onMessageFn(event) {
        if(this._onMessageFn == null) {
            console.log("unhandled message 'ChangeName' received")
            return
        }
        this._onMessageFn(event)
    }
    /**
     * @callback onMessageCb
     * @param {Message} event
     */
    /**
     * @function ChatChannel#onMessage
     * @param {onMessageCb} callback
     */
     onMessage(callback) {
        this._onMessageFn = callback
    }

	/**
	 * @function ChatChannel#onUserEnterFn
	 * @param {UserEnter} event
	*/
    onUserEnterFn(event) {
        if(this._onUserEnterFn == null) {
            console.log("unhandled message 'ChangeName' received")
            return
        }
        this._onUserEnterFn(event)
    }
    /**
     * @callback onUserEnterCb
     * @param {UserEnter} event
     */
    /**
     * @function ChatChannel#onUserEnter
     * @param {onUserEnterCb} callback
     */
     onUserEnter(callback) {
        this._onUserEnterFn = callback
    }

	/**
	 * @function ChatChannel#onUserLeftFn
	 * @param {UserLeft} event
	*/
    onUserLeftFn(event) {
        if(this._onUserLeftFn == null) {
            console.log("unhandled message 'ChangeName' received")
            return
        }
        this._onUserLeftFn(event)
    }
    /**
     * @callback onUserLeftCb
     * @param {UserLeft} event
     */
    /**
     * @function ChatChannel#onUserLeft
     * @param {onUserLeftCb} callback
     */
     onUserLeft(callback) {
        this._onUserLeftFn = callback
    }

	/**
	 * @function ChatChannel#onUserListUpdateFn
	 * @param {UserListUpdate} event
	*/
    onUserListUpdateFn(event) {
        if(this._onUserListUpdateFn == null) {
            console.log("unhandled message 'ChangeName' received")
            return
        }
        this._onUserListUpdateFn(event)
    }
    /**
     * @callback onUserListUpdateCb
     * @param {UserListUpdate} event
     */
    /**
     * @function ChatChannel#onUserListUpdate
     * @param {onUserListUpdateCb} callback
     */
     onUserListUpdate(callback) {
        this._onUserListUpdateFn = callback
    }


    /**
     * @function ChatChannel#sendChangeName
     * @param {ChangeName} message
     */
    sendChangeName = function(message) {
        this.conn.send( JSON.stringify({channel:this.getName(), name:"ChangeName", body: message}) );
    }

    /**
     * @function ChatChannel#sendMessage
     * @param {Message} message
     */
    sendMessage = function(message) {
        this.conn.send( JSON.stringify({channel:this.getName(), name:"Message", body: message}) );
    }

}

