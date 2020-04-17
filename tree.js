class Node {
  constructor (key, value) {
    this.key = key
    this.value = value
    this.left = null
    this.right = null
  }
}

class Tree {
  constructor () {
    this.root = null
    this.size = 0
  }

  insert (key, value) {
    const newNode = new Node(key, value)
    if (this.size === 0) { // 没有根节点
      this.root = newNode
      this.size += 1
    } else {
      let node = this.root
      let parent
      while (node) {
        if (node.key === key) {
          node.value = value
          return
        } else {
          parent = node
          if (key > node.key) {
            node = node.right
          } else if (key < node.key) {
            node = node.left
          }
        }
      }
      if (key > parent.key) {
        parent.right = newNode
      } else {
        parent.left = newNode
      }
      this.size += 1
    }
  }

  delNode (key) {
    if (this.size === 0) {
      return -1
    } else {
      let node = this.root
      let findNode
      let parentNode
      while (node) {
        if (node.key === key) {
          findNode = node
          break
        } else if (key > node.key) {
          parentNode = node
          node = node.right
        } else if (key < node.key) {
          parentNode = node
          node = node.left
        }
      }
      if (findNode) { // 找到
        console.log('找到节 点', findNode, parentNode)
        if (!findNode.left && !findNode.right) {
          if (!parentNode) { // 说明找到的是根节点
            this.root = null
            this.size -= 1
            return
          }
          // 1. 如果删除的节点为叶子节点，即它的左子节点指针和右子节点指针都为空时，则可以直接删掉该节点，并不会影响整棵树的结构。
          if (findNode.key > parentNode.key) { // 删除节点是在父节点的右边
            parentNode.right = null
          } else { // 删除节点是在父节点的左边, 则将节点的左边置为null
            parentNode.left = null
          }
          this.size -= 1
        } else if (findNode.left && findNode.right) {
          // 2. 如果删除的节点有两个子节点
          if (!parentNode) { // 说明是删除根节点
            let curNode = findNode.left
            while (curNode.right) {
              curNode = curNode.right
            }
            return
          }
        } else {
          if (!parentNode) { // 说明是删除根节点
            if (findNode.left) {
              this.root = findNode.left
            } else {
              this.root = findNode.right
            }
            this.size -= 1
            return
          }
          // 3. 如果删除的节点只有一个子节点(左子节点或右子节点)，则直接将子节点提升到被删除的节点位置
          if (findNode.key > parentNode.key) { // 找到的节点是父节点的右边
            if (findNode.left) {
              parentNode.right = findNode.left
            } else {
              parentNode.right = findNode.right
            }
          } else { // 找到的节点是父节点的左边
            if (findNode.left) {
              parentNode.left = findNode.left
            } else {
              parentNode.left = findNode.right
            }
          }
        }
      } else { // 没找到
        console.log('没找到', findNode, parentNode)
      }
    }
  }

}

const tree = new Tree()

tree.insert(2, 2)
tree.insert(1, 1)
tree.insert(1, 333)
tree.insert(3, 3)

tree.delNode(6)
console.log(tree)