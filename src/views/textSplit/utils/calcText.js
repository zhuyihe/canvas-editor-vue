

// 扩展getStyle函数以提取更多的样式属性
function getStyle(element) {
  if(element.tagName=='SPAN'){
    element.style.whiteSpace = 'nowrap' // 不换行
  }
  console.log(element,element.tagName,'element')
  const computedStyle = window.getComputedStyle(element)
  // const style = element.getAttribute('style')
  // let styleObj = null
  // if (style) {
  //   styleObj = style
  //     .split(';')
  //     .map(pair => pair.split(':'))
  //     .reduce((result, [key, value]) => {
  //       // 过滤出 key 和 value 都存在的情况，且 value 不为 "undefined" 
  //       if (key && value && value !== "undefined") {
  //         return { ...result, [key]: value }
  //     } 
  //     return result;
  //     }, {})
  // }
  // return styleObj
  return {
    'font-size': computedStyle.fontSize,
    'line-height': computedStyle.lineHeight,
    // 可继续添加其它需要的样式属性
    color: computedStyle.color,
    'font-weight': computedStyle.fontWeight
    // ...添加你感兴趣的其它样式属性
  }
}

function generateId() {
  return `generated-id-${Math.random().toString(36).substr(2, 9)}`
}

function hasSingleTextNodeChild(element) {
  return element.childNodes.length === 1 && element.childNodes[0].nodeType === 3
}

function estimateTextNodeSize(textNode, maxWidth = 100) {
  const span = document.createElement('span')
  span.style.position = 'absolute' // 防止对页面布局产生影响
  span.style.whiteSpace = 'nowrap' // 不换行
  span.textContent = textNode.textContent.trim()

  document.body.appendChild(span)
  const { width, height } = span.getBoundingClientRect()
  document.body.removeChild(span)

  return { width, height }
}

function flattenDomTree(node, ancestors = []) {
  let flatTree = []

  for (const childNode of node.childNodes) {
    const hasId = childNode.id
    const nodeId = hasId ? childNode.id : generateId() // 如果节点没有id则生成一个新的id

    if (childNode.nodeType === 3 && childNode.textContent.trim()) {
      // 文本节点
      if (hasSingleTextNodeChild(childNode.parentNode)) {
        continue
      } else {
        //遇到文本加点加上span
        const textSizes = estimateTextNodeSize(childNode)
        flatTree.push({
          id: generateId(),
          type: 'span',
          style: {},
          ancestors: ancestors.slice(),
          content: childNode.textContent.trim(),
          width: textSizes.width,
          height: textSizes.height
        })
      }
    } else if (childNode.nodeType === 1) {
      // 元素节点
      const { width, height } = childNode.getBoundingClientRect()
      const flatNode = {
        id: nodeId,
        type: childNode.tagName.toLowerCase(),
        style: getStyle(childNode),
        ancestors: ancestors.slice(),
        content: hasSingleTextNodeChild(childNode)
          ? childNode.textContent.trim()
          : null,
        width: width,
        height: height
      }

      flatTree.push(flatNode)
      if (!hasSingleTextNodeChild(childNode)) {
        const childAncestors = [...ancestors, nodeId]
        flatTree = flatTree.concat(flattenDomTree(childNode, childAncestors))
      }
    }
  }

  return flatTree
}

function htmlToJson(htmlString) {
  const wrapper = document.createElement('div')
  document.body.appendChild(wrapper) // 将wrapper添加到文档中，以确保样式被正确计算
  wrapper.style.visibility = 'hidden' // 防止临时元素改变页面布局
  wrapper.innerHTML = htmlString.trim()
  const jsonOutput = flattenDomTree(wrapper)
  document.body.removeChild(wrapper) // 从文档中移除wrapper
  //开始切割
  getsplitTree(jsonOutput, 100, 100)
  return jsonOutput
}

function getsplitTree(json, maxheight, maxWidth) {
  let renderedHeight = 0 // 已经渲染的高度
  let currentLineHeight = 0 // 当前行的高度
  let currentLineWidth = 0 // 当前行已经占用的宽度
  const windowWidth = window.innerWidth
  console.log(windowWidth, 'windowWidth')
  for (let node of json) {
    //进入切割点
    if (node.content) {
      //当前节点宽度小于可用宽度，则需要后面节点补上这个宽度
      if(node.width<windowWidth){
        // currentLineWidth+=node.width
        if(currentLineWidth+node.width>windowWidth){
            splitNode({node,currentLineWidth,json})
        }else{
          currentLineWidth+=node.width
        }
      }
      // else if(node.width<windowWidth){
      //   renderedHeight += node.height
      // }else if(node.width>windowWidth){

      }
      // if (node.height + renderedHeight >= 100) {
      //   console.log(node, renderedHeight, 'node1')
      //   splitNode({ node, renderedHeight, json })
      //   break
      // } else {
      //   renderedHeight += node.height
      //   console.log(node, renderedHeight, 'node')
      // }
    // }
  }
}
function splitNode({ node, currentLineWidth, json }) {
  const { finalStyle, tagStr } = determineFinalStyleById(node, json)
  const divDom = document.createElement('div')
  const nodeStyle = Object.entries(finalStyle)
    .map(([key, value]) => `${key}:${value}`)
    .join(';')
  const nodehtml =`${tagStr[0]}${node.content}${tagStr[1]}`
  divDom.innerHTML = nodehtml
  var lastChild = findDeepestNode(divDom);
  lastChild.setAttribute('style',nodeStyle)
    console.log(node, currentLineWidth,'currentLineWidth')
  // splitSubNode(lastChild,renderedHeight)
}
function splitSubNode(node,renderedHeight){
  const windowWidth = window.innerWidth
  console.log(renderedHeight,'renderedHeight')
  
}

function findDeepestNode(node){
  if(!node.children.length){
      return node;
  }
  return findDeepestNode(Array.from(node.children).pop());
}

function getNodeById(flatDom, id) {
  return flatDom.find(node => node.id === id) || null
}

function determineFinalStyleById(node, flatDom) {
  let finalStyle = {}
  let tagStr = ['',''],endtagStr=[]
  // 遍历祖先节点id数组
  for (const ancestorId of node.ancestors) {
    const ancestorNode = getNodeById(flatDom, ancestorId)

    // 如果找到了祖先节点，合并其样式
    if (ancestorNode) {
      if (ancestorNode.style) {
        Object.assign(finalStyle, ancestorNode.style)
      }
      if(ancestorNode.type){
        tagStr[0] += `<${ancestorNode.type}>`
        endtagStr.push(`</${ancestorNode.type}>`)
      }
      
      
    }
  }

  // 最后合并当前节点的样式
  if (node.style) {
    Object.assign(finalStyle, node.style)
  }
  tagStr[1]=endtagStr.reverse().join('')
  return { finalStyle, tagStr }
}

// // 解析HTML字符串，转换成JSON对象
// function (htmlString) {
//   const wrapper = document.createElement('div');
//   wrapper.innerHTML = htmlString.trim();
//   const rootNode = wrapper.firstChild;
//   return domToJson(rootNode);
// }

export default htmlToJson
