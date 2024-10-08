import { NextFunction, Request, Response } from "express"
import createError from "http-errors";
import categoryModel from "../model/categories.models"


 const handelPostCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryData = req.body;
        categoryData.created_at = Date()

        const savedCategory = new categoryModel(categoryData)
        await savedCategory.save()     

        res.status(201).send({
            message: "Category Added..."
        })

    } catch (error) {
        next(error)
    }
}

const handelGetCategoryByParams = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query

        const categoryDetails = await categoryModel.find(query)

        if(!categoryDetails){
            throw createError.NotFound("Category not found...")
        }
        res.status(200).send(categoryDetails)
    } catch (error) {
        next(error)
    }
}

 const handelUpdateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id

        console.log(id)
        const newCategoryData = req.body
        const result = await categoryModel.findByIdAndUpdate(id, {$set: newCategoryData})



        if(!result)
            throw createError.NotFound("Could not find the category...")
        console.log(result)

        res.status(201).send({
            message: "Category updated successfully..."
        })
    } catch (error) {
        next(error)
    }
}

const handelDeleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId = req.params.id
        const deletedCategory = await categoryModel.findByIdAndDelete(categoryId)

        if(deletedCategory?.id == categoryId)
            res.status(201).send({
                message: "Category Deleted successfully..."
            })
        else
            throw createError.NotFound("Invalid Category...")
        
    } catch (error) {
        next(error)
    }
}

export default {
    handelPostCategory,
    handelGetCategoryByParams,
    handelUpdateCategory,
    handelDeleteCategory
}