package com.ciokoko.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class Group {
    private List<Product> products;
}
