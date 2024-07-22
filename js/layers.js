addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    tabFormat: [
        "main-display",
        "prestige-button",
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
    function makeRed(c){
        return "<span style='color:#FF0000'>" + c + "</span>"
    }
    
    addLayer("p", {
        name: "People", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "🧍", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: true,
            points: new ExpantaNum(0),
        }},
        color: "3399FF",
        requires: new ExpantaNum([10]), // Can be a function that takes requirement increases into account
        resource: "People", // Name of prestige currency
        baseResource: "points", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type() {if (hasUpgrade("z", 12)) return "static"
        else return "normal"},    
        exponent() {if (hasUpgrade("z", 12)) return new EN(Infinity)
        else return new EN(0.5)},      
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new ExpantaNum(1)
            return mult
        },
        gainMult() {
            let mult = new ExpantaNum(1)
            if (hasUpgrade('p', 11)) mult = mult.times(2)

            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new ExpantaNum(1)
        },
        tabFormat: [
            "main-display",
            "prestige-button",
            ["microtabs", "stuff"],
            ["blank", "25px"],
        ],
        microtabs: {
            stuff: {
                            "Upgrades": {
                                unlocked() {return (hasAchievement("a", 11))},
                        content: [
                            ["blank", "15px"],
                            ["raw-html", () => `<h4 style="opacity:.5">Welcome to the Pro Tree!<br> Your goal is to reach the endgame. You can press P to gain People.<br> Which is used to buy upgrades.</h4>`],
                            ["upgrades", [1,2,3,4,5,6,7,8,9]]
                        ],
                        "Tutorial": {
                            unlocked() {return (hasAchievement("a", 11))},
                            content: [
                                ["blank", "15px"],
                                "lore"
                            ]
                            
                        },
                    },
                },
            },
            update(diff){
                player.bestPoints = player.bestPoints.max(player.points)
                player.bestNS = player.bestNS.max(player.su.points)
            },
        upgrades: {
            11: { title: "1",
            description: "Double your point gain.",
            cost: new ExpantaNum(1),
    
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})