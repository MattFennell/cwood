package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.RefreshToken;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface RefreshTokenRepo extends CrudRepository<RefreshToken, UUID> {

    public List<RefreshToken> findByExpiryLessThan(Date expiry);

    public List<RefreshToken> findByUser(ApplicationUser user);

}