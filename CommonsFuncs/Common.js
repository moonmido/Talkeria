
export const getRoomId=(id1,id2)=>{
    const ids = [id1,id2].sort();
    const roomId = ids.join('-');
    return roomId;
}