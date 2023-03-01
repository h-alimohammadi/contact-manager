// import * as Yup from 'Yup';
import { object, string, number } from 'yup';
export const contactSchema = object({
    fullname: string().required("نام و نام خانوادگی الزامی می باشد"),
    photo: string()
        .required("تصویر مخاطب الزامی می باشد"),
    mobile: number().required("شماره موبایل الزامی می باشد"),
    email: string()
        .email("آدرس ایمیل معتبر نیست")
        .required("آدرس ایمیل الزامی می باشد"),
    job: string().nullable(),
    group: string().required("انتخاب گروه الزامی می باشد"),
});
// let userSchema = object({
//     name: string().required(),
//     age: number().required().positive().integer(),
//     email: string().email(),
//     website: string().url().nullable(),
//     createdOn: date().default(() => new Date()),
// });