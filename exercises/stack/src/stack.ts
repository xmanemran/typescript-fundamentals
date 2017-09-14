interface IStack<T> {
  push(item: T): IStack<T>;
  push(items: T[]): IStack<T>;
  pop(): T | undefined;
  length(): number;
  print(): void;
}

interface ListNode<T> {
  data: T;
  next?: ListNode<T>;
}

export class Stack<T> implements IStack<T> {
  private head: ListNode<T> | undefined
  push(item: T): Stack<T>
  push(items: T[]): Stack<T>
  push(arg: T[] | T) {
    if (arg instanceof Array) {
      arg.forEach(item => this.push(item));
    } else {
      let newNode = {
        data: arg,
        next: this.head
      }
      this.head = newNode;
    }
    return this;
  }
  pop() {
    let n = this.head;
    this.head = this.head ? this.head.next : undefined;
    return n ? n.data : undefined;
  }
  length() {
    let i = 0;
    let n: ListNode<T> | undefined = this.head;
    while(n) {
      i++;
      n = n.next;
    }
    return i;
  }
  print() {
    let n: ListNode<T> | undefined = this.head;
    while(n) {
      console.log(n.data);
      n = n.next;
    }
  }
}