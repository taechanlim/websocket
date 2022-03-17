const fs = require('fs')
const number = parseInt(fs.readFileSync("./dev/stdin").toString())

class Node {
    constructor(item){
        this.item = item
        this.next = null
    }
}

class Queue {
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(item){
        const node = new Node(item)
        if (this.head === null) {
            this.head = node;
            this.head.next = this.tail;
        } else {
            this.tail.next = node
        }

        this.tail = node;
        this.length +=1;
    }

    pop(){
        const popItem = this.head;
        this.head = this.head.next;
        this.length -= 1;
        return popItem;
    }
}

const que = new Queue();
for (let i =1; i<=number; i++){
    que.push(i)
}

while(que.length != 1){
    que.pop()
    que.push(que.pop().item)
}

console.log(que.head.item)