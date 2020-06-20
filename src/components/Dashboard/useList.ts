// DOUBLE LINKED LIST FOR NAVIGATING USER PAGES
export class ListNode {
    value: any
    next: any
    previous: any
    constructor(value) {
      this.value = value
      this.next = null
      this.previous = null
    }

    // simple methods for return next and previous on a given node
    // e.g. if getting the next-to-last value on the LL: UserPage.last.getPrevious
    getNext() { return this.next }
    getPrevious() { return this.previous }
}

class LinkedList {
    first: any
    last: any
    size: number
    constructor() {
      this.first = null // head/root element
      this.last = null // last element of the list
      this.size = 0 // total number of elements in the list
    }

    get length() {
      return this.size
    }

    addLast(value) {
      const newNode = new ListNode(value)

      if (this.first) {
        newNode.previous = this.last
        this.last.next = newNode
        this.last = newNode
      } else {
        this.first = newNode
        this.last = newNode
      }

      this.size += 1

      return newNode
    }

    get(index = 0) {
      return this.find((current, position) => {
        if (position === index) {
          return current
        }
        return undefined
      })
    }

    find(callback) {
      for (let current = this.first, position = 0;
        current;
        position += 1, current = current.next) {
        const result = callback(current, position)

        if (result !== undefined) {
          return result
        }
      }
      return undefined // not found
    }
}

// export list instance
export const UserPage = () => new LinkedList()
