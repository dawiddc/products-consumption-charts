package com.ciokoko.endpoints;

import com.ciokoko.dao.ProductDao;
import com.ciokoko.dao.ProductDaoImpl;
import com.ciokoko.model.Product;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductEndpoint {

    @GetMapping("/products")
    public List<Product> getProducts() {
        ProductDao productDao = new ProductDaoImpl();
        return productDao.getProducts();
    }
}
