package com.rj.UMS.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rj.UMS.backend.dtos.UserDto;
import com.rj.UMS.backend.services.UserService;
import com.rj.UMS.backend.util.CommonUtil;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<?> createUser(@RequestBody UserDto userDto) throws Exception {

        Boolean saveUser = userService.createUser(userDto);

        if (saveUser) {
            return CommonUtil.createBuildResponseMessage("User created successfully", HttpStatus.CREATED);
        }
        return CommonUtil.createErrorResponseMessage("User not created", HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody UserDto userDto) throws Exception {

        Boolean saveUser = userService.updateUser(id, userDto);

        if (saveUser) {
            return CommonUtil.createBuildResponseMessage("User updated successfully", HttpStatus.CREATED);
        }
        return CommonUtil.createErrorResponseMessage("Failed to update user", HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<UserDto> users = userService.getAllUser();
        if (CollectionUtils.isEmpty(users)) {

            return ResponseEntity.noContent().build();
        }
        return CommonUtil.createBuildResponse(users, HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
     @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> deleteUser(@PathVariable String id) throws Exception {

        userService.deleteUser(id);
        return CommonUtil.createBuildResponseMessage("Delete success", HttpStatus.OK);

    }

}
