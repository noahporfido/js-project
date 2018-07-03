function loadTree() {

	tree = {
		name : "start",
		pox : 600,
		poy : 50,
		isRed : false,
		isGreen : false,
		audios : [{
				name : "http://irgendwo/irgendwie/jingle.wav"
			}, {
				name : "http://irgendwo/irgendwie/welcome.wav"
			}
		],
		child : [{
				name : "2",
				pox : 800,
				poy : 200,
				isRed : false,
				isGreen : true,
				audios : [{
						name : "http://irgendwo/irgendwie/jingle.wav"
					}, {
						name : "http://irgendwo/irgendwie/welcome.wav"
					}
				],
				child :
				[{
						name : "2",
						pox : 850,
						poy : 350,
						rid : "1122",
						reason : "(65111)",
						isRed : false,
						isGreen : true,
						audios : [{
								name : "http://irgendwo/irgendwie/jingle.wav"
							}, {
								name : "http://irgendwo/irgendwie/welcome.wav"
							}
						],
						child : []
					}, {
						name : "1",
						pox : 750,
						poy : 350,
						rid : "3344",
						reason : "(65222)",
						isRed : true,
						isGreen : false,
						audios : [{
								name : "http://irgendwo/irgendwie/jingle.wav"
							}, {
								name : "http://irgendwo/irgendwie/welcome.wav"
							}
						],
						child : []
					}
				]
			}, {
				name : "1",
				pox : 320,
				poy : 200,
				isRed : true,
				isGreen : false,
				audios : [{
						name : "http://irgendwo/irgendwie/jingle.wav"
					}, {
						name : "http://irgendwo/irgendwie/welcome.wav"
					}
				],
				child :
				[{
						name : "4",
						pox : 450,
						poy : 350,
						isRed : false,
						isGreen : false,
						audios : [{
								name : "http://irgendwo/irgendwie/jingle.wav"
							}, {
								name : "http://irgendwo/irgendwie/welcome.wav"
							}
						],
						child :
						[{
								name : "2",
								pox : 400,
								poy : 500,
								rid : "1122",
								reason : "(65111)",
								isRed : false,
								isGreen : true,
								audios : [{
										name : "http://irgendwo/irgendwie/jingle.wav"
									}, {
										name : "http://irgendwo/irgendwie/welcome.wav"
									}
								],
								child : []
							}, {
								name : "1",
								pox : 500,
								poy : 500,
								rid : "3344",
								reason : "(65222)",
								isRed : true,
								isGreen : false,
								audios : [{
										name : "http://irgendwo/irgendwie/jingle.wav"
									}, {
										name : "http://irgendwo/irgendwie/welcome.wav"
									}
								],
								child : []
							}
						]
					}, {
						name : "3",
						pox : 350,
						poy : 350,
						rid : "1122",
						reason : "(65111)",
						isRed : true,
						isGreen : true,
						audios : [{
								name : "http://irgendwo/irgendwie/jingle.wav"
							}, {
								name : "http://irgendwo/irgendwie/welcome.wav"
							}
						],
						child : []
					}, {
						name : "2",
						pox : 250,
						poy : 350,
						rid : "1122",
						reason : "(65111)",
						isRed : false,
						isGreen : true,
						audios : [{
								name : "http://irgendwo/irgendwie/jingle.wav"
							}, {
								name : "http://irgendwo/irgendwie/welcome.wav"
							}
						],
						child : []
					}, {
						name : "1",
						pox : 150,
						poy : 350,
						rid : "3344",
						reason : "(65222)",
						isRed : true,
						isGreen : false,
						audios : [{
								name : "http://irgendwo/irgendwie/jingle.wav"
							}, {
								name : "http://irgendwo/irgendwie/welcome.wav"
							}
						],
						child : []
					}
				]
			}
		]
	};
	
	//log holen und bereitstellen
	log = document.getElementById("log");
	log.innerHTML += "Tree Loaded by method<br>";
	log.innerHTML += "Tree: "+JSON.stringify(tree, null, 2)+"<br>";
}

function loadTreeSmall() {

	tree = {
		name : "start",
		pox : 600,
		poy : 50,
		isRed : false,
		isGreen : false,
		audios : [{
				name : "http://irgendwo/irgendwie/jingle.wav"
			}, {
				name : "http://irgendwo/irgendwie/welcome.wav"
			}
		],
		child : [{
				name : "2",
				pox : 800,
				poy : 200,
				isRed : false,
				isGreen : true,
				audios : [{
						name : "http://irgendwo/irgendwie/jingle.wav"
					}, {
						name : "http://irgendwo/irgendwie/welcome.wav"
					}
				],
				child :
				[]
			}, {
				name : "1",
				pox : 320,
				poy : 200,
				isRed : true,
				isGreen : false,
				audios : [{
						name : "http://irgendwo/irgendwie/jingle.wav"
					}, {
						name : "http://irgendwo/irgendwie/welcome.wav"
					}
				],
				child :
				[]
			}
		]
	};
}

function loadTreeX() {
	
	tree = {name:"start", pox:100, poy:50, isRed:false, isGreen:false, child:[], audion:[]};
	akt = tree;
	for (var i = 0; i < 300; i++) 
	{
		newNode = {name:"start", pox:100, poy:50+(i+1)*65, isRed:false, isGreen:false, child:[], audion:[]}; 
		akt.child = [newNode];
		akt = newNode;
	}
}