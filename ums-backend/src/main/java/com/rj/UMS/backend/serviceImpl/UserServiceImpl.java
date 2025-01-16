package com.rj.UMS.backend.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import java.util.List;
import org.modelmapper.ModelMapper;
import com.rj.UMS.backend.dtos.UserDto;
import com.rj.UMS.backend.entity.User;
import com.rj.UMS.backend.exception.ResourceNotFoundException;
import com.rj.UMS.backend.repositories.UserRepository;
import com.rj.UMS.backend.services.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper mapper;

    //////////////////////// CREATE USER /////////////////////////
    @Override
    public Boolean createUser(UserDto userDto) throws Exception {

        // checking if the request is for update or create new user
        if (userDto.getId() != null) {
            userRepository.findById(userDto.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("User ID invalid"));

        }
        User user = mapper.map(userDto, User.class);
        User saveUser = userRepository.save(user);
        if (!ObjectUtils.isEmpty(saveUser)) {
            return true;
        }
        return false;
    }

    
    //////////////////////// UPDATE USER /////////////////////////
   
    @Override
    public Boolean updateUser(String id, UserDto userDto) throws Exception {
        userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User ID invalid"));
        userDto.setId(id);
        User user = mapper.map(userDto, User.class);
        User saveUser = userRepository.save(user);

        if (!ObjectUtils.isEmpty(saveUser)) {
            return true;
        }
        return false;
    }

    
    //////////////////////// GET ALL USER /////////////////////////

    @Override
    public List<UserDto> getAllUser() {
        List<User> users = userRepository.findAll();

        // Convert List<User> to List<UserDto> using the mapper
        List<UserDto> userDtos = users.stream()
                .map(user -> mapper.map(user, UserDto.class))
                .toList();
        return userDtos;
    }

    
    //////////////////////// DELETE USER /////////////////////////

    @Override
    public void deleteUser(String id) throws Exception {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notes id invalid or not found"));

        userRepository.delete(user);
    }

}
