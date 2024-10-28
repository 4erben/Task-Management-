import * as Yup from "yup";


export const taskSchema = Yup.object().shape({
    image:Yup.mixed()
    .required("Image is required")
    .test("fileType","Unsupported file type",(value)=>{
        return value && value[0]  && ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
    })
    .test("fileSize", "File size is too large (max 100 KB)", (value) => {
        return value && value[0] && value[0].size <= 102400; // 100 KB
    }),
    title: Yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
    description: Yup.string().required("Description is required"),
    priority: Yup.string().oneOf(["low", "medium", "high"], "Priority is required"),
    state: Yup.string().oneOf(["todo", "doing", "done"], "State is required"),
});



export const editTaskSchema = Yup.object().shape({
    image:Yup.mixed()
    .test("fileType","Unsupported file type",(value)=>{
        if(typeof value === "object"){
            return value && value[0] && ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
        }else{
            return true;
        }
         
    })
    .test("fileSize", "File size is too large (max 100 KB)", (value) => {
        if(typeof value === "object"){
            return value[0] ? value[0].size <= 102400:true; // 100 KB
        }else{
            return true;
        }
    }),
    title: Yup.string().min(3, "Title must be at least 3 characters"),
    description: Yup.string(),
    priority: Yup.string().oneOf(["low", "medium", "high"], "Priority is required"),
    state: Yup.string().oneOf(["todo", "doing", "done"], "State is required"),
});
