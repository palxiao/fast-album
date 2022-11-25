

export default (type: string, url: string) => {
  const link_element = document.createElement(type)
  if (type === 'script') {
    link_element.setAttribute('src', url)
  } else if (type === 'link') {
    link_element.setAttribute('rel', 'stylesheet')
    link_element.setAttribute('href', url)
  }
  document.head.appendChild(link_element)
}
