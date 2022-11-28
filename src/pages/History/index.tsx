import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useContext } from 'react';
import { CyclesContext } from '../../contexts/CyclesContext';
import { Cycle } from '../../reducers/cycles/reducer';
import { HistoriList, HistoryContainer, Status } from './styles';

const History = () => {
  const { cycles } = useContext(CyclesContext);

  function displayCycleListReversed(cycles: Cycle[]) {
    const array = [];
    for (let i = cycles.length - 1; i >= 0; i--) {
      array.push(
        <tr key={cycles[i].id}>
          <td>{cycles[i].task}</td>
          <td>{cycles[i].minutesAmount} minutos</td>
          <td>
            {formatDistanceToNow(new Date(cycles[i].startDate), {
              addSuffix: true,
              locale: ptBR,
            })}
          </td>
          <td>
            {cycles[i].finishedDate && (
              <Status statusColor='green'>Concluido</Status>
            )}
            {cycles[i].interruptedDate && (
              <Status statusColor='red'>Interrompido</Status>
            )}
            {!cycles[i].finishedDate && !cycles[i].interruptedDate && (
              <Status statusColor='yellow'>Em andamento</Status>
            )}
          </td>
        </tr>
      );
    }

    return array;
  }

  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>

      <HistoriList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{displayCycleListReversed(cycles)}</tbody>
        </table>
      </HistoriList>
    </HistoryContainer>
  );
};

export default History;
