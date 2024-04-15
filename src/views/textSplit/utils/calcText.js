// import {htmlText} from './const'
function createContainer() {
    const container = document.createElement('div');
    container.className = 'text-container';
    console.log(document.getElementsByClassName('splitContent'))
    document.querySelector('.splitContent').appendChild(container);
    return container;
  }
  
  const  splitAndRenderHtml=(htmlContent)=> {
    // 创建一个隐藏的临时容器用于测量
    const measureContainer = createContainer();
    measureContainer.style.visibility = 'hidden';
    document.querySelector('.splitContent').appendChild(measureContainer);
  
    let visibleContainer = createContainer(); // 创建第一个可见容器
    let position = 0;
    let fragment = document.createDocumentFragment();
    
    while (position < htmlContent.length) {
      // 逐步增加内容，并检查是否超出了隐藏容器的高度
      measureContainer.innerHTML = htmlContent.substring(0, position);
      
      // 检查高度是否超出
      if (measureContainer.scrollHeight > measureContainer.clientHeight) {
        // 如果超出了，回溯到最后一个完整的元素结束处
        let lastFullElementEndPos = htmlContent.lastIndexOf('>', position - 1) + 1;
        fragment.appendChild(document.createRange().createContextualFragment(htmlContent.slice(0, lastFullElementEndPos)));
  
        // 清空临时容器，并将已有部分移动到新的可见容器中
        measureContainer.innerHTML = '';
        visibleContainer.appendChild(fragment);
        fragment = document.createDocumentFragment();
        
        // 更新HTML内容位置并创建新的可见容器
        htmlContent = htmlContent.substring(lastFullElementEndPos);
        position = 0;
        visibleContainer = createContainer();
        
        continue;
      }
      
      // 没有超出则增加position进行下次检查
      position++;
    }
  
    // 处理剩余的HTML内容（如果有）
    if (position > 0) {
      fragment.appendChild(document.createRange().createContextualFragment(htmlContent));
      visibleContainer.appendChild(fragment);
    }
    
    // 移除隐藏的临时容器
    document.body.removeChild(measureContainer);
  }

export default splitAndRenderHtml
//   // 假设htmlContent为包含您想要渲染的HTML内容的字符串
//   splitAndRenderHtml(htmlText);
  