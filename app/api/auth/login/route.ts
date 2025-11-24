import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

const saltRounds:number = 10;

export async function POST(req:NextRequest) {
    const body = await req.json()
    console.log(body)
    bcrypt.hash(body.password, saltRounds, function (err,hashedPassword) {
        console.log(err);
        console.log(hashedPassword);
        
    })
}