class FXMLHttpRequest extends EventTarget {
  constructor() {
    super();
    this._url = "";
    this._requestType = "";
    this._responseText = "";
    this._status = "";
  }

  open(valueType, url) {
    this._requestType = valueType;
    this._url = url;
  }

  send(data = "") {
    net(this, data);
    this.dispatchEvent(new Event("load"));
  }
}
