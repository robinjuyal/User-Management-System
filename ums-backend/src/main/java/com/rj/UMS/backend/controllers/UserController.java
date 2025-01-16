package com.rj.UMS.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
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

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<?> createUser(@RequestBody UserDto userDto) throws Exception {

        Boolean saveUser = userService.createUser(userDto);

        if (saveUser) {
            return new ResponseEntity<>("saved successfully", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Failed to save", HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody UserDto userDto) throws Exception {

        Boolean saveUser = userService.updateUser(id, userDto);

        if (saveUser) {
            return new ResponseEntity<>("Updated successfully", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Failed to update", HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @GetMapping
    public List<UserDto> getAllUsers() {
        List<UserDto> users = userService.getAllUser();
        if (!ObjectUtils.isEmpty(users)) {

            return users;
        }
        return null;
    }
}
