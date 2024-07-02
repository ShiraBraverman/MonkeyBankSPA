function net(fxhr, data) {
  let url = fxhr._url.split("/");
  if (url[1] == "accounts") server(fxhr, data);
}