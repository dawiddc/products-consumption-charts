package com.ciokoko.endpoints;

import com.ciokoko.dao.ProductDao;
import com.ciokoko.model.Group;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@AllArgsConstructor
public class ProductEndpoint {

    ProductDao productDao;

    @CrossOrigin
    @GetMapping("/products")
    public Map<String, Group> getGroups() {
        return productDao.getGroups();
    }
}