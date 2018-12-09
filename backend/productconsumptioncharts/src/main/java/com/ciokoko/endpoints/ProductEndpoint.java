package com.ciokoko.endpoints;

import com.ciokoko.dao.ProductDao;
import com.ciokoko.model.Group;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
public class ProductEndpoint {

    ProductDao productDao;

    @CrossOrigin
    @PostMapping("/products")
    public Map<String, Group> getGroups(@RequestBody List<String> requestedGroups) {
        return productDao.getGroups(requestedGroups);
    }
}