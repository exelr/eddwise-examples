// Code generated by eddwise, DO NOT EDIT.

package pingpong

import (
	"errors"

	"github.com/exelr/eddwise"
)

var _ eddwise.ImplChannel = (*Pingpong)(nil)
var _ PingpongRecv = (*Pingpong)(nil)

type PingpongRecv interface {
	OnPong(eddwise.Context, *Pong) error
}

type Pingpong struct {
	server eddwise.Server
	recv   PingpongRecv
}

func (ch *Pingpong) Name() string {
	return "pingpong"
}

func (ch *Pingpong) Bind(server eddwise.Server) error {
	ch.server = server
	return nil
}

func (ch *Pingpong) SetReceiver(chr eddwise.ImplChannel) error {
	if _, ok := chr.(PingpongRecv); !ok {
		return errors.New("unexpected channel type while SetReceiver on 'Pingpong' channel")
	}
	ch.recv = chr.(PingpongRecv)
	return nil
}

func (ch *Pingpong) GetServer() eddwise.Server {
	return ch.server
}

func (ch *Pingpong) Route(ctx eddwise.Context, evt *eddwise.EventMessage) error {
	switch evt.Name {
	default:
		return eddwise.ErrMissingServerHandler(evt.Channel, evt.Name)

	case "pong":
		var msg = &Pong{}
		if err := ch.server.Codec().Decode(evt.Body, msg); err != nil {
			return err
		}
		if err := msg.CheckReceivedFields(); err != nil {
			return err
		}
		return ch.recv.OnPong(ctx, msg)

	}
}

func (ch *Pingpong) OnPong(eddwise.Context, *Pong) error {
	return errors.New("event 'Pong' is not handled on server")
}

func (ch *Pingpong) SendPing(client eddwise.Client, msg *Ping) error {
	return client.Send(ch.Name(), msg)
}

func (ch *Pingpong) BroadcastPing(clients []eddwise.Client, msg *Ping) error {
	return eddwise.Broadcast(ch.Name(), msg, clients)
}

// Event structures

// Ping is emitted from server
type Ping struct {
	// the Id of the ping
	Id uint `json:"id"`
}

func (evt *Ping) GetEventName() string {
	return "ping"
}

func (evt *Ping) CheckSendFields() error {
	return nil
}

func (evt *Ping) CheckReceivedFields() error {
	return nil
}

// after a ping, a Pong is sent from client
type Pong struct {
	// the Id of the pong, same as the Id of the received ping
	Id uint `json:"id"`
}

func (evt *Pong) GetEventName() string {
	return "pong"
}

func (evt *Pong) CheckSendFields() error {
	return nil
}

func (evt *Pong) CheckReceivedFields() error {
	return nil
}