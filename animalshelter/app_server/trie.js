class TrieNode {
    constructor() {
        //store child nodes
        this.children = {};
        //if end of word
        this.isWord = false;
    }
}

class Trie {
    constructor() {
        //initialize the root node
        this.root = new TrieNode();
    }
    
    insert(word) {
        //start at the root node
        let node = this.root;
        //run through each character in the word
        for (let i = 0; i < word.length; i++) {
            //if the character is not a child of the current node
            if (!node.children[word[i]]) {
                //create a new node
                node.children[word[i]] = new TrieNode();
            }
            //move character to the child node
            node = node.children[word[i]];
        }
        //mark the end of the word
        node.isWord = true;
    }

    suggestHelper(root, list, curr) {
        //if the current node is the end of the word
        if (root.isWord) {
            //add the word to suggestion list
            list.push(curr);
        }
        if (!Object.keys(root.children).length) {
            //if there are no children nodes leave function
            return;
        }
        for (let child in root.children) {
            //build the word and add it to the list
            this.suggestHelper(root.children[child], list, curr + child);
        }
    }

    suggest(prefix) {
        //start at the root node
        let node = this.root;
        //initialize current prefix
        let curr = "";
        //iterate through all characters in the prefix
        for (let i = 0; i < prefix.length; i++) {
            //if the character is not found leave function
            if (!node.children[prefix[i]]) {
                return [];
            }
            //move to the child node
            node = node.children[prefix[i]];
            //add character to the prefix string
            curr += prefix[i];
        }
        //initialize suggestion list
        let list = [];
        //send information to suggest helper to get suggestions
        this.suggestHelper(node, list, curr);
        //return suggestions
        return list;
    }
}

module.exports = Trie;
