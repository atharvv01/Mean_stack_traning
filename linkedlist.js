/** This is my first attempt to try and create a linked list in javascript
 * with functionalities like insert / delete at head,tail or any nth postion
 */

/** Creating the class node and a constructor 
 * @param {number} data the data that will be inputed in node
 */
class node {
    /** this will be called evertime a new node is created,setting its next 
    *to null and add the value to its data part.
    */
    constructor(data) 
    {
        this.data = data
        this.next = null
    }
}
/**
 * creating this class for the functions of inserting and deletion of nodes in
 * linked list
 */
class linkedList
{
    constructor()
    {
        this.head = null
    }
    /**This method is used know the size of the linked list
     * @returns {Number} returns a count value which is size of linked list
     */
    sizeOflinkedlist()
    {
        let count =0;
        let current = this.head
        while(current)
        {
            count++
            current = current.next
        }
        return count

    }
    /** This method is used to insert data at head of the linked list
     * @param {Number} data the data that will be inputed in the node
     * @throws {Error} when the data is not a number
     * head is also updated to newNode since its the first node in
     * the list now 
     */
    insertHead(data)
    {
        if (typeof data !== 'number' || isNaN(data)) {
            throw new Error('Data must be a number')
        }
        const newNODE = new node(data)
        newNODE.next = this.head
        this.head = newNODE
    }
    /** This method is used to insert data at tail of linked list
     * @param {number} data the data that will be inputed in the node
     * @throws {Error} when the data is not a number
     */
    insertTail(data)
    {
        if (typeof data !== 'number' || isNaN(data)) {
            throw new Error('Data must be a number');
        }
        if(!this.head)
        {
            this.insertHead(data)
            return
        }
        const newNode = new node(data)
        let curr = this.head
        while(curr.next != null)
        {
            curr = curr.next
        }
        curr.next = newNode
    }
    /** This method is used to insert data at nth postion in linked list
     * @param {number} n n is the index where node is to be inserted
     * @param {number} data data that will be inputed in the code
     * @throws {Error} when data is not a number and index is negative number
     * or index is greater than size of linked list
     */
    insertMiddle(n,data)
    {
        if (isNaN(parseInt(data))) 
        {
            throw new Error('Data must be a number');
        }
        if (isNaN(n) || n>0 || n>=this.sizeOflinkedlist()) {
            throw new Error('Index Invalid')
        }
        if(n === 1)
        {
            this.insertHead(data)
            return
        }
        let curr = this.head
        let count = 1
        while(count!=n-1){
            curr = curr.next
            count++
        }
        if(curr.next == null)
        {
            this.insertTail(data)
        }
        newNode.next = curr.next
        curr.next = newNode
    }
    /** This method is used to delete the node from the start of the linked list
     */
    deleteHead()
    {
        if(!this.head) // if head is null,list doesnt have any node
        {
            return
        }
        this.head = this.head.next
    }
    /** This method is used to delete the node from the end of the linked list
     */
    deleteTail()
    {
        if(!this.head) // if head is null,list doesnt have any node
        {
            return
        }
        let curr = this.head
        while(curr.next.next != null)
        {
            curr = curr.next
        }
        curr.next = null;
    }
    /** This method is used to delete the node from the end of the linked list
     * @param {Number} n index of node to be deleted 
     * @throws {Error} when index is not valid
     */
    deleteMiddle(n)
    {
        if (isNaN(n) || n>0 || n>=this.sizeOflinkedlist()) {
            throw new Error('Index Invalid')
        }
        if(n === 1)
        {
            this.deleteHead()
            return
        }
        let curr = this.head
        let count = 1
        while(count!=n-1){
            curr = curr.next
            count++
        }
        if(curr.next)
        {
            current.next = curr.next.next
        }
    }
    /**This method prints the whole linked list */
    printLinkedlist()
    {
        let curr = this.head
        while(curr)
        {
            console.log(curr.data)
            curr = curr.next
        }
    }
}

