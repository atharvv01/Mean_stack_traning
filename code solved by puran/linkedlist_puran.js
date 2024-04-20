/* This is my implementation of the Linked List Data Structure
 * @author Puran
*/

// this class is going to be the individual item in the linked list, it is also the root, also the rest of the chain
// correct?


/** Class representing a Node inside of a linked list.
 * @author Puran
 */
class LinkedListNode {

    /** the data that is to be stored in this node
     * @type {any} 
     * @private
     */
    data

    /** the reference to the next Node in the linked list
     * @type {LinkedListNode}
     * @private
     */
    next

    /** Constuct a new node with the data given
     * @param {any} data any data that is to be stored in the linked list
     * @throws {Error} when no data is given to the constructor
     */
    constructor(data) {
        if (data === undefined) {
            // no parameter has been sent while creating this node
            throw new Error("Data is a mandatory parameter for node creation!")
        }

        // associating the data with this node
        this.data = data

        // setting the child of this node as undefined (so no children)
        this.next = undefined
    }

    /** Method to return the data of this node
     * @returns {any} the data stored in this node
     */
    getData() {
        return this.data
    }

    /** Method to return the child/successor of this node
     * @returns {LinkedListNode} the data stored in this node
     */
    getNext() {
        return this.next
    }

    /** Basic testing function to check sanity of the code
     */
    static testingFunction() {
        
        // let firstNode = new LinkedListNode() // testing a call to the constructor with no data

        // let secondNode = new LinkedListNode(1876545678909876549876) // testing the creation
    }
}

/** Class representing a LinkedList made by using the LinkedListNode class
 * implemented above
 */
class LinkedList {

    /** A number representing the length of the linked list
     * @private 
     * @type {Number} an integer, 0 or more only possible
     */
    length

    /** The root node of the linked list, can be undefined for an empty list
     * @private
     * @type {LinkedListNode}
     */
    root

    /** The overloaded(?) constructor, which either returns an empty list 
     * or a list having one node whose data is 'root_data' passed
     * @param {any} root_data the (optional) data to be inserted to the
     * list root
     */
    constructor(root_data=undefined) {

        if (root_data) { // user has sent some data
            let newRoot = new LinkedListNode(root_data)

            this.root = newRoot
            this.length = 1
        } else {
            this.root = undefined
            this.length = 0
        }

    }

    /** Method to print the linked list in a human readable format
     * @returns {String} A human readable format of the linked list
     */
    getListInHumanReadableFormat() {
        
        if (this.root == undefined) {
            return "This is an empty Linked List."
        } else {

            let returnString = "ROOT "
            returnString += "-> " + this.root.getData()
            let currentNode = this.root
            while (currentNode.getNext()) {
                currentNode = currentNode.getNext()
                returnString += "-> " + this.root.getData()
            }
            returnString += " ____..."
            return returnString
        }

    }

    static testingFunction() {
        let firstList = new LinkedList()
        console.log(firstList.getListInHumanReadableFormat())
        let secondList = new LinkedList(1)
        console.log(secondList.getListInHumanReadableFormat())

        console.log("Testing LinkedList class done")
    }

}

LinkedList.testingFunction()
