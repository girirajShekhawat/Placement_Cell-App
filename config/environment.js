

const  development={
    name:'development',
    port:'8000',
    assests_path:'./assests',
    session_cookie_key:'demo',
    db:'Placement_Cell',

}

const production ={
    name:'production',
    port:process.env.port,
    assests_path:process.env.assests_path,
    session_cookie_key:process.env.session_cookie_key,
    db:process.env.db,

}


module.exports=eval(process.env.name)==undefined ? development : eval(process.env.name)
