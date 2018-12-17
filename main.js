var game = new Phaser.Game(1024, 576);
var speed = 800;

var fruitBox = {
    preload: function() {
        // Charge les images
        game.load.image("background", "assets/background.jpg");
        game.load.image("banana", "assets/banana.png");
        game.load.image("apple", "assets/apple.png");
        
    },
    create: function() {
        // Setup du jeu + Affichage
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.add.sprite(0, 0, "background");
        
        this.banana = game.add.sprite(300, 300, 'banana');
        this.banana.anchor.set(0.5);
        game.physics.arcade.enable(this.banana);
        
        this.cursors = game.input.keyboard.createCursorKeys();
        
        this.badGroup = game.add.group(); 
        this.timer = game.time.events.loop(200, this.addBad, this);
        
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", {font: "30px Arial", fill: "#fff"});
    },
    update: function() {
        // Logique du jeu
        game.physics.arcade.overlap(this.banana, this.badGroup, this.restartGame, null, this);
        this.banana.body.velocity.x = 0;
        this.banana.body.velocity.y= 0;
        if(this.cursors.left.isDown) {
            this.banana.body.velocity.x = speed * -1;
        }
        if(this.cursors.right.isDown) {
            this.banana.body.velocity.x = speed;
        }
        if(this.cursors.up.isDown) {
            this.banana.body.velocity.y = speed * -1;
        }
        if(this.cursors.down.isDown) {
            this.banana.body.velocity.y = speed;
        }
        if(this.banana.inWorld == false) {
         game.state.start("fruitBox"); // Relance le jeu;
        }
    },
    restartGame: function() {
         game.state.start("fruitBox"); // Relance le jeu;
    },
    addBad: function() {
        var position = Math.floor(Math.random() * 924  + 1); // 924 = largeur du fond (1024) - largeur d'une pomme (100)
        var bad = game.add.sprite(position, -100, 'apple');
        game.physics.arcade.enable(bad);
        bad.body.gravity.y = 200;
        
        this.badGroup.add(bad);
        
        this.score += 20;
        this.labelScore.text = this.score;
        
        bad.checkWorldBounds = true;
        bad.outOfBoundsKill = true;
    }
};

game.state.add("fruitBox", fruitBox); // Ajoute le jeu
game.state.start("fruitBox"); // Lance le jeu;