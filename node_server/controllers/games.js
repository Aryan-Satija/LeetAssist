const Riddles = require('../models/Riddles.js')
const User = require('../models/Users.js');
exports.gridGame = async(req, res) => {
    try{
        const items = [
            [
                '🍟', '🌭', '🍿', '🧂', '🥓', '🥚', '🍳', '🧇', '🥞', '🧈',
                '🍞', '🥐', '🥨', '🥯', '🥖', '🫓', '🧀', '🥗', '🥙', '🥪',
                '🌮', '🌯', '🫔', '🥫', '🍖', '🍗', '🥩', '🍠', '🥟', '🥠',
                '🥡', '🍱', '🍘', '🍙', '🍚', '🍛', '🍜', '🦪', '🍣', '🍤'
            ],
            [
                "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", 
                "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", 
                "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", 
                "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", 
                "44", "45", "46", "47", "48", "49"
            ],
            [
                'function', 'var', 'let', 'const', 'if', 'else', 'for', 'while', 'return', 'break',
                'continue', 'switch', 'case', 'default', 'class', 'extends', 'super', 'this', 'new', 'try',
                'catch', 'finally', 'throw', 'import', 'export', 'module', 'require', 'async', 'await', 'promise',
                'lambda', 'map', 'reduce', 'filter', 'set', 'list', 'tuple', 'dict', 'object', 'array', 'interface'
            ],
            [
                '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊',
                '😋', '😎', '😍', '😘', '🥰', '😗', '😙', '🥲', '😚', '🙂‍↔️',
                '🙂', '🤗', '🤩', '🤔', '🫡', '🤨', '😐', '😑', '😶', '😶‍🌫️',
                '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '🥱',
                '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕'
            ]
        ]

        const index = Math.floor(Math.random() * 4);

        const available = [...items[index]]
        const selected = []

        for(let i = 0; i < 16; i++){
            const rindex = Math.floor(Math.random() * available.length);
            selected.push(available[rindex])
            available.splice(rindex, 1)
        }
        
        return res.status(200).json({
            success: true,
            grid: selected,
            randomInstance: items[index][Math.floor(Math.random() * items[index].length)]
        })
    } catch(err) {
        return res.status(500).json({
            success: false,
            grid: [],
            randomInstance: -1
        })
    }
}

exports.riddles = async(req, res) => {
    try {
        const selected = await Riddles.aggregate([{
            $sample: {
                size: 5
            }
        }])
        
        return res.status(200).json({
            success: true,
            questions: selected
        })
    } catch(err){
        return res.status(500).json({
            success: false,
            questions: []
        })
    }
}

exports.update = async(req, res)=>{
    try{
        const {email, mem, dbg, rsn} = req.body;
        if(!email || !mem || !dbg || !rsn) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        await User.findOneAndUpdate({email}, {
            memory: mem,
            reasoning: rsn,
            debugging: dbg,
            lastPlayed: new Date()
        })
        return res.status(200).json({
            success: true,
            message: 'Task Successful'
        })
    } catch(err){
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}