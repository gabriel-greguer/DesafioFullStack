const router = require('express').Router()
const task = require('../model/Task')


router.post('/',async(req, res,next)=>{
    const {title,description,date,duration}=req.body
    if(!title || description==='' || duration === "")
    {
        res.status(422).json({error:'bad request'});
    }

    console.log('tipo ==',typeof(date));
    const dbDate = new Date(date);
    const newTask = {title,description,date:dbDate,duration};
    try{
        await task.create(newTask);
        res.status(201).json({message:"pessoa inserida com sucesso"});
    }
    catch(error){
        res.status(500).json({error:error});
    }
})

router.get('/',async(req,res)=>{
    try{
        const allTasks = await task.find()
        res.status(200).json(allTasks);
    }
    catch(error){
        res.status(500).json({error:error})
    }
})

router.put('/:title', async(req,res) =>{
    const titles = req.params.title
    const {title,description,date,duration} = req.body
    const dbDate = new Date(date);
    try{
        const updatedTask = {title,description,date:dbDate,duration};
        const num = await task.updateOne({title:titles},updatedTask)

        if(num.modifiedCount !== 1)
        {
            res.status(422).json({error:'não encontrado'})
        }
        else{
            res.status(200).json({log:'updated'});
        }
    }catch(err){
        res.status(500).json({error:err})
    }
})

router.patch('/:title', async(req,res) =>{
    const titles = req.params.title
    const {done} = req.body
    
    try{
        const updatedTask = {done};
        const num = await task.updateOne({title:titles},updatedTask)

        if(num.modifiedCount !== 1)
        {
            res.status(422).json({error:'não encontrado'})
        }
        else{
            res.status(200).json({log:'updated'});
        }
    }catch(err){
        res.status(500).json({error:err})
    }
})



router.get('/:title',async(req,res)=>{
    const title = req.params.title
    
    try{
        const allWithThisTitle = await task.findOne({title:title})

        if(allWithThisTitle.size === 0 )
        {
            res.status(500).json({error:error})
        }
        res.status(200).json(allWithThisTitle);
    }
    catch(error){
        res.status(500).json({error:error})
    }
})

//delete de uma tarefa com o nome
router.delete('/:title',async (req,res)=>{

    const title = req.params.title;
    const taskToDelete = await task.findOne({title:title});

    if(!taskToDelete)
            {
                res.status(422).json({message:'Usuario não encontrado!'});
                return;
            }

    try{
        await task.deleteOne({title:title});
        res.status(200).json({message:"removido com sucesso"});
    }catch(err){
        res.status(500).json({error:err});
    }
})

router.delete('/',async (req,res)=>{
    try{
    task.deleteMany({}, ()=>{console.log('all deleted')})
    res.status(200).json({message:"removido com sucesso"});
    }
    catch(err)
    {
        res.status(500).json({error:err})
    }
    
})




module.exports = router