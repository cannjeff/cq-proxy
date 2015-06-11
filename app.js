var http 		= require('http'),
	httpProxy 	= require('http-proxy'),
	proxy 		= httpProxy.createProxyServer({}),
	url			= require('url'),
	proxyConfig;

http.createServer(function ( req, res ) {
	var hostname = req.headers.host.split(':')[0],
		pathname = url.parse(req.url).pathname;

	console.log('hostname', hostname);
	console.log('pathname', pathname);

	switch (hostname) {
		case 'api.cryptoquip.io':
			proxy.web(req, res, { target: 'http://localhost:3000' });
			break;
		case 'cryptoquip.io':
			proxy.web(req, res, { target: 'http://localhost:3001' });
		default:
			console.log('No app found for', hostname, pathname);
	}
}).listen(80, function () {
	console.log('Listening on port 80');
});