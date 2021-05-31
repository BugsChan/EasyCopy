

const {app, screen, BrowserWindow, Menu} = require("electron");

const RunWindow = () => {
	Menu.setApplicationMenu(null);
	app.whenReady().then(() => {
		const {width, height} = screen.getPrimaryDisplay().workAreaSize;
		let win = new BrowserWindow(
			{width: width / 1.8, height: height / 3 * 2}
		);
		win.loadURL("http://localhost");
		win.once("closed", () => {
			console.log("Program exit");
			process.exit();
		});
	});
	
}

module.exports = RunWindow;