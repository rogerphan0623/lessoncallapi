
var initialState=[
    {
        id:1,
        name:'Iphone 6s',
        price: 300,
        status:true
    },
    {
        id:2,
        name:'Samsung Galaxy S7',
        price: 500,
        status:true
    },
    {
        id:3,
        name:'Iphone 6 plus',
        price: 400,
        status:true
    },
    {
        id:4,
        name:'Oppo F1 plus',
        price: 400,
        status:true
    }
];

const products=(state=initialState,action)=>{
    switch(action.type){
        default: return [...state];
    }
}

export default products;