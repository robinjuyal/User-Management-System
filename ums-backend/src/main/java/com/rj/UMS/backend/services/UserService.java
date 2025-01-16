package com.rj.UMS.backend.services;

import java.util.List;

import com.rj.UMS.backend.dtos.UserDto;

public interface UserService {

    public Boolean createUser(UserDto userDto)throws Exception;

    public Boolean updateUser(String id, UserDto userDto) throws Exception;

    public List<UserDto> getAllUser();

    public void deleteUser(String id) throws Exception;

}
