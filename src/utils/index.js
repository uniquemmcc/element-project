export const getRandomStr = (str)=>{
    return str+Math.random()
    .toString(36)
    .slice(-8);
}

//递归数组为对象添加一个itemId
export const roleList = list =>{

    return list.map(item => {
        if (item.children) {
            return {
                itemId: getRandomStr(`${item.id}_`),
                ...item,
                children: roleList(item.children)
            }
        } else {
           
            return {
                itemId: getRandomStr(`${item.id}_`),
                ...item,
            }
        }

    })
}