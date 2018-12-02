package com.ciokoko.endpoints;

import com.ciokoko.dao.ProductDao;
import com.ciokoko.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductEndpoint {

    @Autowired
    ProductDao productDao;

    @GetMapping("/products")
    public List<Product> getProducts() {
        return productDao.getProducts();
    }
}
