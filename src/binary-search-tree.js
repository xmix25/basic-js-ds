const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  treeRoot = null;
  root() {
    return this.treeRoot;
  }

  add(data) {
    this.treeRoot = recursiveAdd(this.treeRoot, data);

    function recursiveAdd(node, value) {
      if (!node) {
        return new Node(value);
      }
      if (node.data === value) {
        return node;
      }
      if (value < node.data) {
        node.left = recursiveAdd(node.left, value);
      } else {
        node.right = recursiveAdd(node.right, value);
      }
      return node;
    }
  }

  has(data) {
    return recursiveSearch(this.treeRoot, data);

    function recursiveSearch(node, value) {
      if (!node) {
        return false;
      }
      if ((node.data = value)) {
        return true;
      }
      return value < node.data
        ? recursiveSearch(node.left, value)
        : recursiveSearch(node.right, value);
    }
  }

  find(data) {
    return recursiveFind(this.treeRoot, data);

    function recursiveFind(node, value) {
      if (!node) {
        return null;
      }
      if (node.data === value) {
        return node;
      }
      return value < node.data
        ? recursiveFind(node.left, value)
        : recursiveFind(node.right, value);
    }
  }

  remove(data) {
    this.treeRoot = recursiveRemove(this.treeRoot, data);

    function recursiveRemove(node, value) {
      if (!node) {
        return null;
      }

      if (value < node.data) {
        node.left = recursiveRemove(node.left, value);
        return node;
      } else if (value > node.data) {
        node.right = recursiveRemove(node.right, value);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }
        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.value = minFromRight.value;

        node.right = recursiveRemove(node.right, minFromRight.value);

        return node;
      }
    }
  }

  min() {
    return recursiveMin(this.treeRoot);

    function recursiveMin(node) {
      if (!node) {
        return null;
      }
      if (!node.left) {
        return node.data;
      }
      return recursiveMin(node.left);
    }
  }

  max() {
    return recursiveMax(this.root);

    function recursiveMax(node) {
      if (!node) {
        return null;
      }
      if (!node.right) {
        return node.data;
      }
      return recursiveMax(node.right);
    }
  }
}

module.exports = {
  BinarySearchTree,
};
