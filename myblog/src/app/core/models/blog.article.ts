
//Keep Body number as 0 for creating new Blog 
// Update the blog if blogId already exists in backend. 

export interface Blog {
    title: string,
    body: string,
    imagePath: string,  //Image path in assets folder on server. 
    blogId: number,
    logoPath: string
}