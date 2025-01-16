const data = require('../roadmap.json');
exports.Roadmap = async(req, res) => { 
    try{
        const {lc_rating} = req.body;
        const roadmap = [];
        data.forEach((item) => {
            if(lc_rating >= item.min && lc_rating <= item.max){
                roadmap.push(item.topic)
            }
        });
        return res.status(200).json({
            success: true,
            data : roadmap
        })
    } catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        });
    }
}

