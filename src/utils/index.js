import cloneDeep from 'clonedeep'
export const setStorage = (key, value) =>{
    localStorage.setItem(key, value);
}
export const getStorage = (key)=>{
    return localStorage.getItem(key);
}


export const filterList = list => {


    return list.filter(item => {
        if (item.meta.notmenu) {
            return false
        } else {
            if (item.children) {
                item.children = filterList(item.children)
            }
            return true
        }
    })


}

export const getRandomStr = (str)=>{
    return str+Math.random()
    .toString(36)
    .slice(-8);
}

//递归数组为对象添加一个itemId ， 并去掉空children属性 , 最新更改不用自己加itemId
export const roleList1 = list =>{

    return list.map(item => {
        
            if (item.children&&item.children.length>0) {
                return {
                    // itemId: getRandomStr(`${item.id}_`),
                    ...item,
                    children: roleList1(item.children)
                }
            } else {
                let obj = {
                    // itemId: getRandomStr(`${item.id}_`),
                    ...item,
                }
                delete obj.children
                return obj
            }

    })
}


export const sendRoleList1 = list => {
    return list.map(item=>{
        if(item.children&&item.children.length>0){
            return {
                
                    ...item,
                children: sendRoleList1(item.children)
            }
        }else{
            return {
              
                ...item,
                children: [],
            }
        }
    })

}



//递归数组为对象添加一个itemId ， 并去掉空children属性 , 最新更改不用自己加itemId
export const roleList2 = list =>{

    return list.map(item => {
        
            if (item.children&&item.children.length>0) {
                return {
                    // itemId: getRandomStr(`${item.id}_`),
                    ...item,
                    children: roleList2(item.children)
                }
            } else {
                let obj = {
                    // itemId: getRandomStr(`${item.id}_`),
                    ...item,
                }
                delete obj.children
                return obj
            }

    })
}


export const sendRoleList2 = list => {
    return list.map(item=>{
        if(item.children&&item.children.length>0){
            return {
                
                ...item,
                children: sendRoleList2(item.children)
            }
        }else{
            return {
              
                ...item,
                children: [],
            }
        }
    })

}


export const mergeArray = (list1, list2)=>{
    for(let i=0; i<list1.length; i++){
        if(list1[i].children&&list1[i].children.length>0){
            let obj = cloneDeep(list2[i])
            delete obj.children
            list1[i]= Object.assign( list1[i], obj)
            mergeArray(list1[i].children, list2[i].children)
        }else{   
            list1[i]= Object.assign( list1[i], list2[i])
        }
    }
}



// export const getRelationList = list => {
//     let arr = []


//     relationList(list, arr ,0)

//     console.log('getRelationList',arr)
//     return arr
// }

// // let index = 0
// export const relationList = (list, arr, index) => {

//     list.forEach(item => {


//         if(index===0)
//         arr.push({
//             id:item.id,
//             check: item.check,
//             "first_level": item.name,
//             "second_level": '',
//             "third_level": '',
//             "fourth_level": '',
//         })

//         else if(index===1)
//         arr.push({
//             id:item.id,
//             check: item.check,
//             "first_level": '',
//             "second_level": item.name,
//             "third_level": '',
//             "fourth_level": '',
//         })

//         else if(index===2)
//         arr.push({
//             id:item.id,
//             check: item.check,
//             "first_level": '',
//             "second_level": '',
//             "third_level": item.name,
//             "fourth_level": '',
//         })

//         else if(index===3)
//         arr.push({
//             id:item.id,
//             check: item.check,
//             "first_level": '',
//             "second_level": '',
//             "third_level": '',
//             "fourth_level": item.name,
//         })



//         if (item.children&&item.children.length>0) {




//             let i = index 
//             i ++
//             relationList(item.children,arr , i)


//         } else {

//         //    index = 0 
//         }


//     })
// }









export const testRelation = list =>{

    list.forEach(item =>{
        if(item.children.length===0){   //1
            item.children.push({id:1, name:'abc集团', zhanwei: true ,children: [ {id:1, name:'abc集团', zhanwei: true , children: [ {id:1, name:'abc集团', zhanwei: true}] } ]})
            
           
        }else{
            item.children.forEach(item=>{ //2
                if(item.children.length === 0){
                    item.children.push({id:1, name:'abc集团', zhanwei: true ,children: [ {id:1, name:'abc集团', zhanwei: true , } ]})  
                }else{
                     
                    item.children.forEach(item => { //3
                        if(item.children.length === 0){
                            item.children.push({id:1, name:'abc集团', zhanwei: true })     
                        }
                    })
                }
            })
        }
        
    })

}

import axios from 'axios'

let  url='https://restapi.amap.com/v3/config/district?keywords=&subdistrict=1&extensions=base&key=2c5c52c39ec2afd8128c21f003fb544c'
// export const getCity = ()=>{

//     return new Promise((resolve, reject)=>{
//         let list = []
//         let mycityData =JSON.parse(getStorage('mycityData'))
       
//         if(mycityData&&mycityData.length>0){
//             list = mycityData
//              resolve(list)
//         }else{
            
//                   axios.get(url).then( async res=>{
              
            
    
//                 list = res.data.districts[0].districts
    
//                   for(let i = 0 ;i<list.length; i++ ){
          
//                 list[i].districts = await getArr(list[i].name)
                   
//                   }
    
//                 //   list = list.map(item=>{
//                 //     return {
//                 //       name: item.name
//                 //     }
//                 //   })
//                    list  = forCity(list)
                  
//                   setStorage('mycityData', JSON.stringify(list) )
//                   resolve( JSON.parse(getStorage('mycityData')))       
                      
//               }).catch(e=>{
//                     reject(e)
//               })
//         }
//     })
    


// }

export const getCityFromNet = ()=>{
    if (!window.indexedDB) {
        window.indexedDB = window.mozIndexedDB || window.webkitIndexedDB || window.msIndexDB;      //webkit是chrome
    }

 
    var database 
    var request = indexedDB.open("myDb",1); 


}

export const getCity = ()=>{

    return new Promise( async (resolve, reject)=>{

        try{

            setStorage('mycityData','')
        let list = []

       
        if (!window.indexedDB) {
            window.indexedDB = window.mozIndexedDB || window.webkitIndexedDB || window.msIndexDB;      //webkit是chrome
        }

     
      
        var request = indexedDB.open("myDb",1); 

            request.onupgradeneeded = async function(e){
                console.log('onupgradeneeded')
              var  database=e.target.result;
              var store = database.createObjectStore("mycityData", {keyPath: "uuid", autoIncrement: true});    //此处表示将uuid作为主键
              　　//keyPath 后面的值一定是要存在的属性名，用于标志唯一字段，如果重复则不添加进去，可以是字符串、数值类型等 
              　　//此值也是索引中的 Primary key(keyPath : "uuid")
                  store.createIndex("name", "name", {unique: false});   //创建索引 (此处的id改为uuid)

                    

                  


            }
      
            request.onsuccess= async function(e){
                console.log('onsuccess')
               var database=e.target.result;

                if (database.objectStoreNames.contains('mycityData')) { 

                      
                    var tx = database.transaction(["mycityData"], "readonly");  
                    var store = tx.objectStore("mycityData");
                    var request = store.count();
                    request.onsuccess = async function() {
                        var count = request.result;
                        console.log(count);
                        if(count>0){

                            var tx = database.transaction(["mycityData"], "readonly");    //readwrite readonly
                            var store = tx.objectStore("mycityData");
                            var openCursor = store.openCursor();
                            openCursor .onsuccess = async  function(e) {
                                var cursor= e.target.result;
                                //var cursor = event.target.result;
                      
                                if(cursor){
                              
                                    console.log('fromCursor',cursor.value);                                   
                                    cursor.continue();
                                    resolve(cursor.value)
                                }
                            };


                        }else{
                            list = await getBaseCity(url)
    
                            for(let i = 0 ;i<list.length; i++ ){
                    
                            list[i].districts = await getArr(list[i].name)
                            
                            }
                
                            list  = forCity(list)

                            var tx = database.transaction(["mycityData"],"readwrite");
                            var store = tx.objectStore("mycityData");
                            store.put(list); 


                            console.log('fromNet',list);
                            resolve(list)
                        }
                    }
                       
                    
                        

                            
                       

                        


                }
               
            

               
               
            };
        
       
       
       


            
                 
        }catch(e){
          reject(e)
        }          
             



        // }
        
       
    })
    


}



export const forCity = (list)=>{
     return list.map(item=>{

        if(item.districts&&item.districts.length>0){
            return{
                name: item.name,
                districts:  forCity(item.districts)
            }
        }else{

            return{
                name: item.name,
             
            }    
        }
     })
}

export const getBaseCity = (url)=>{
    return new Promise((resolve,reject)=>{
       
        axios.get(url).then(res=>{
     
          resolve(res.data.districts[0].districts)
     }).catch(e=>{
         reject(e)
     })
  })
}
export const getArr = (name)=>{
    return new Promise((resolve,reject)=>{
       
          
          axios.get(`https://restapi.amap.com/v3/config/district?keywords=${encodeURIComponent(name)}&subdistrict=3&extensions=base&key=2c5c52c39ec2afd8128c21f003fb544c`).then(res=>{
       
            resolve(res.data.districts[0].districts)
       }).catch(e=>{
           reject(e)
       })
    })
}



export const hasLastChild  = ( selectList,mycityData) =>{
    let flag = false
    let len = selectList.length
    let index = 0

    

    const foo22 = (selectList,mycityData)=>{
 
        if(len === 0 ){

            return
        }
 

        mycityData.forEach(item=>{
            if(item.name === selectList[index]){
              
                
                index++
                if(item.districts){

                        
                        if(len<=index){
                            flag = true
                            return
                        }
                        foo22(selectList,item.districts)
                    
                    
                }
                
            }
        })
    }

    foo22(selectList,mycityData)


    return flag
    
}
export const hasLast2Child  = ( selectList,mycityData) =>{
    let flag = true
    let len = selectList.length
    let index = 0

    

    const foo22 = (selectList,mycityData)=>{
 
        if(len === 0 ){

            return
        }
 

        mycityData.forEach(item=>{
            if(item.name === selectList[index]){
              
                
                index++
                if(item.districts){

                        
                        if(index>=3){
                            flag = false
                            return
                        }
                        foo22(selectList,item.districts)
                    
                    
                }else {
                    flag = false
                    return
                }
                
            }
        })
    }

    foo22(selectList,mycityData)


    return flag
    
}


//业务组相关
export const addSort = (list) =>{
    return list.map((item,index) => {
        
        if(item.attr_list&&item.attr_list.length>0){
            return{
              ...item,
              sort: index + 1 ,
              attr_list: addSort(item.attr_list)
            }
            

        }else if(item.second_list&&item.second_list.length>0){

            item.second_list = item.second_list.filter(fItem =>{
                return fItem.name!==''
            })
            if(item.second_list&&item.second_list.length>0){
                return{
                    ...item,
                    sort: index + 1 ,
                    second_list: addSort(item.second_list)
                  }
            }else{
                return{
                    ...item,
                    sort: index + 1,
                    second_list: []
                  }
            }
            
        }else{
          
            
            return {
              ...item,
              sort: index + 1 ,           
            }
        }

    })
}

export const formatObjForBusiness = (list , flag) =>{
    return list.map((item,index) => {
        
        if(item.attr_type==1){
            
            if(flag){ //修改页面，需要补全second_list

                //之前系统生成的数据，有些详情返回的数据没有attr_list，需要修复
                if(!item.hasOwnProperty('attr_list')){
                    let firstObj={
                        name: '',
                        sort: '',
                        id: '',
                        second_list: [
                          {
                              id: '',
                             name: "", 
                              sort: "",
                          }
                        ]
                    }
                    let attr_list = []   
                    attr_list.push(firstObj) 
                    item['attr_list'] = attr_list    
                }else{                   
                    item.attr_list = formatObjForBusinessArray(item.attr_list )
                }
                
                
            }else{ 

                //之前系统生成的数据，有些详情返回的数据没有attr_list，需要修复
                if(!item.hasOwnProperty('attr_list')){
                    let firstObj={
                        name: '',
                        sort: '',
                        id: '',
                        // second_list: [
                        //   {
                        //       id: '',
                        //      name: "", 
                        //       sort: "",
                        //   }
                        // ]
                    }
                    let attr_list = []   
                    attr_list.push(firstObj) 
                    item['attr_list'] = attr_list     
                }
            }
            
         
            return {
                ...item,
                drag: true,
            }

        }else if(item.attr_type == 2){
            return {
                ...item, 
                value_max:   item.attr_list[0].value_max,
                value_min:   item.attr_list[0].value_min,
                number_point: item.attr_list[0].number_point,
                attr_list: [],
                drag: true,
            }
        }
        else if(item.attr_type == 3){
     
            return {
                ...item, 
                value_max:   item.attr_list[0].value_max,
                value_min:   item.attr_list[0].value_min,
                attr_list: [],
                drag: true,
              }
           
        }

    })
}

const formatObjForBusinessArray = (list) =>{
    return list.map((item,index) => {
        if(item.second_list&&item.second_list.length>0){
            
            return {
                ...item,
                
            }

        }
        else{
            let  secondObj= {
                id: '',
                 name: "", 
                  sort: "",
            }
            let second_list = []
            second_list.push(secondObj)
            return {
                ...item, 
                second_list,
              }
           
        }

    })
}






