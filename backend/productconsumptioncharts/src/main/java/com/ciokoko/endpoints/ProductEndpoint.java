package com.ciokoko.endpoints;

import com.ciokoko.dao.ProductDao;
import com.ciokoko.model.Product;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class ProductEndpoint {

    ProductDao productDao;

    @GetMapping("/products")
    public List<Product> getProducts() {
        return productDao.getProducts();
    }
}