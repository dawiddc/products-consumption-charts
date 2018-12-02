package com.ciokoko.model;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class Product {
    private String name;
    private String unit;
    private Map<Integer, Double> valuesPerYear;
}
