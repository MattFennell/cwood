package uk.co.scottlogic.gradProject.server.repos;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;
import uk.co.scottlogic.gradProject.server.repos.documents.PlayerPoints;
import uk.co.scottlogic.gradProject.server.repos.documents.Transaction;

@Repository
public interface PlayerPointsRepo extends CrudRepository<PlayerPoints, UUID> {

    public List<Player> findByPlayer(Player player);

}