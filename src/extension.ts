// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "multi-copy-paste" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Jana Manoharan!');
	});

	let clipboard:string[] = [];
	
	context.subscriptions.push(disposable);

	let copyFunction = vscode.commands.registerCommand('extension.copy', () => {
		var editor = vscode.window.activeTextEditor;
	
		if (editor !== undefined) {
			
			let startLine = editor.selection.start.line;
			let startChar = editor.selection.start.character;
			let endLine = editor.selection.end.line;
			let endChar = editor.selection.end.character;

			clipboard.push(editor.document.getText(new vscode.Range(new vscode.Position(startLine, startChar),
			 new vscode.Position(endLine, endChar))));
		}

		vscode.window.showInformationMessage("Text Copied");	

		
	});

	context.subscriptions.push(copyFunction);

	let pasteFunction = vscode.commands.registerCommand('extension.paste', async () => {
		let value = await vscode.window.showQuickPick(clipboard);

		console.log("value selected: " + value);


	});

	context.subscriptions.push(pasteFunction);
}

// this method is called when your extension is deactivated
export function deactivate() {}
