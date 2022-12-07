export const slugify = (str = '') => str.toLowerCase().replace(/ /g, '-').replace(/\./g, '')
export const uniqueID = Math.floor(Math.random() * 100)
