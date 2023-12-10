package com.khanhtoan.springbootlibrary.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    @GetMapping("/hello")
    public String hello(){
        return "hello";
    }
}
